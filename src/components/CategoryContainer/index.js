// base
import React from 'react'
import classNames from 'classnames'

// components
import CategoryItem from '../CategoryItem/index'
import { makeStyles } from '@material-ui/core/styles'

const categories = [
  {
    name: 'label1',
    link: '/category/123',
    img: 'https://www.searchengines.ru/wp-content/uploads/2017/04/google-video1-ss-1920.png',
    amountVideos: 15
  },
  {
    name: 'label2',
    link: '/category/123',
    img: 'https://www.searchengines.ru/wp-content/uploads/2017/04/google-video1-ss-1920.png',
    amountVideos: 15
  },
  {
    name: 'label3',
    link: '/category/123',
    img: 'https://www.searchengines.ru/wp-content/uploads/2017/04/google-video1-ss-1920.png',
    amountVideos: 15
  },
  {
    name: 'label4',
    link: '/category/123',
    img: 'https://www.searchengines.ru/wp-content/uploads/2017/04/google-video1-ss-1920.png',
    amountVideos: 15
  },
  {
    name: 'label5',
    link: '/category/123',
    img: 'https://www.searchengines.ru/wp-content/uploads/2017/04/google-video1-ss-1920.png',
    amountVideos: 15
  },
  {
    name: 'label6',
    link: '/category/123',
    img: 'https://www.searchengines.ru/wp-content/uploads/2017/04/google-video1-ss-1920.png',
    amountVideos: 15
  },
  {
    name: 'label7',
    link: '/category/123',
    img: 'https://www.searchengines.ru/wp-content/uploads/2017/04/google-video1-ss-1920.png',
    amountVideos: 15
  },
  {
    name: 'label8',
    link: '/category/123',
    img: 'https://www.searchengines.ru/wp-content/uploads/2017/04/google-video1-ss-1920.png',
    amountVideos: 15
  }
]


const useStyles = makeStyles({
  container: {
    padding: '0 1rem'
  }
})

export default function MediaCard() {
  const classes = useStyles()
  return (
    <div className={classNames(classes.container, 'row')}>
      {
        categories.map((item, index) => (
          <div className="col-sm-12 col-md-6 col-lg-4" key={index}>
            <CategoryItem category={item}/>
          </div>)
        )}
    </div>
  )
}
