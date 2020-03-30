import gql from "graphql-tag"

export const allPosts = gql`
      query {
        allPosts {
          id
          title
          videoUrl
          image
          preview
        }
      }`


export const postById = (id) => {
  return gql`
      query {
         Post(where: { id: "${id}" }) {
          id
          title
          videoUrl
          image
          preview
          categories {
            title
          }
        }
      }
    `
}
