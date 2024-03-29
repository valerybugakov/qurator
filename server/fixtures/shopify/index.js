import fs from 'fs'
import path from 'path'
import configShared from '../../../shared/config'
import db from '../../db'
import Image from '../../models/image'
import Artist from '../../models/artist'
import Product from './product'
import d3 from 'd3'
import log from '../../log'
import config from 'config'

const readFixtures = (fileName) => (
  fs.readFileSync(path.resolve(`./server/fixtures/${fileName}`), 'utf-8')
)

db(config.get('db'), log).then(() => {
  const error = console.error.bind(console)
  const { options } = configShared

  const variants = options.variants.map(variant => ({
    ...variant,
    option1: variant.size,
    option2: variant.finish,
  }))

  const updateShopifyProductsAndMongoDB = async() => {
    try {
      log('Removing images from DB...')
      await Image.remove()
      log('Removed images from DB')

      log('Removing artits from DB...')
      await Artist.remove()
      log('Removed artists from DB')

      log('Loading images from file')
      const images = d3.csv.parse(readFixtures('images.csv'), image => {
        if (!image.featured) { delete image.featured }
        return {
          ...image,
          _id: +image._id,
          artist_id: +image.artist_id,
          tags: image.tags.split(', '),
        }
      })

      const artists = d3.csv.parse(readFixtures('artists.csv'), artist => ({
        ...artist,
        _id: +artist._id,
      }))

      log(`Loaded ${images.length} images from file`)
      log(`Loaded ${artists.length} artists from file`)

      log('Loading products from shopify')
      const products = await Product.list()
      log(`Found ${products.length} products`)

      if (products.length) {
        log('Deleting products from shopify')

        for (let i = 0; i < products.length; i++) {
          const product = products[i]
          await Product.delete(product.id)
          log(`Deleted #${i} id ${product.id}`)
        }
      }

      log('Adding products to shopify')

      for (let i = 0; i < images.length; i++) {
        const image = images[i]
        const { title, url, artist_id } = image
        const artist = artists[artist_id]

        const { product } = await Product.create({
          product: {
            title,
            variants,
            published: true,
            published_scope: 'global',
            product_type: 'Image on canvas',
            options: [
              { name: 'Size' },
              { name: 'Finish' },
            ],
            body_html: `<strong>Artist:</strong> ${artist.name}<br /> ` +
              `<strong>Artist BIO:</strong> ${artist.bio}`,
            images: [
              {
                attachment: fs.readFileSync(path.resolve(`./img/thumb/${url}`), 'base64'),
              },
            ],
          },
        })

        log(`Added #${i} productId ${product.id}`)
        log(`Saving #${i} image to Mongo...`)
        await Image.create({ ...image, productId: product.id })
        log('...saved')
      }

      log(`Added ${images.length} products`)

      log('Saving artists to Mongo')
      await Artist.collection.insert(artists)
      log(`Added ${artists.length} artists`)
      return images
    } catch (err) {
      error(err)
      return err
    }
  }

  updateShopifyProductsAndMongoDB().then(() => {
    log('Go to shopify and publish all products for Button#6')
    process.exit()
  }).catch(() => log('Go and fix your ERROR!'))
})
