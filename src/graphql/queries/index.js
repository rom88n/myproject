import gql from 'graphql-tag'

export const allPosts = gql`
      query {
        allPosts(orderBy: "createdAt_DESC") {
          id
          title
          videoUrl
          image
          preview
          hd
        }
      }
`

export const postById = gql`
query getPost($id: ID! ) {  
  Post( where: { id: $id } ) {
      id
      title
      videoUrl
      image
      preview
      hd
      categories {
        title
        url
      }
  }
}
`
