const keystone = require('keystone')
const Types = keystone.Field.Types

/**
 * Post Model
 * ==========
 */

const Post = new keystone.List('Post', {
  map: { name: 'title' }
})

Post.add({
  title: { type: String, required: true },
  url: { type: String, initial: true },
  status: { type: Types.Select, options: 'disabled, published', default: 'published', index: true },
  type: { type: Types.Select, options: 'films, serials', default: 'films', index: true },
  year: { type: Number, initial: true },
  duration: { type: String, initial: true },
  description: { type: Types.Textarea, initial: true },
  picture_url: { type: String, initial: true },
  kp_rating: { type: Number, initial: true },
  ivi_rating: { type: Number, initial: true },
  kp_id: { type: Number, initial: true },
  ivi_id: { type: Number, initial: true },
  artists: { type: Types.TextArray, initial: true },
  categories: { type: Types.Relationship, ref: 'PostCategory', many: true }
})

Post.defaultColumns = 'title, year, type, status'
Post.register()
