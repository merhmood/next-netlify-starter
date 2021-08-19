import Link from "next/link";
import Footer from '@components/Footer'

export default function Home({posts}) {
  return (
    <div className="container">
      <main>
        <h1>All News Headlines</h1>
        {posts.items.map((post) => {

          const {id,title, published} = post;
          const {displayName} = post.author;
          const {url} = post.author.image;

          const publishedStringReformat = (string) => {

            const stringFormatSet = [];
            const stringToArr = string.split("T");

            for (let index = 0; index < 4; index++) {
              if (index === 0) {
                stringFormatSet.push("Date:");
              }
              else if (index === 1) {
                stringFormatSet.push(stringToArr[0]);
              }
              else if (index === 2){
                stringFormatSet.push("Time:");
              }
              else{
                stringFormatSet.push(stringToArr[1]);
              }
            }
            return stringFormatSet.join(" ");
          }

          const NewPublishedString = publishedStringReformat(published)
        
        return(

          <div key={id} className="">
            <div className="">
              <Link href={`/${id}`}>
                <a>
                  <h4>
                    <b>{title}</b>
                  </h4>
                </a>
              </Link>
              <img src={url} alt="postImage" />
              <p>{displayName}</p>
              <p>{NewPublishedString}</p>
            </div>
          </div>
        )
        })
      }
      </main>

      <Footer />
    </div>
  )
}
export async function getStaticProps() {
  const res = await fetch("https://www.googleapis.com/blogger/v3/blogs/2399953/posts?key=AIzaSyDGNC0zC-0HtxKxYM0VbMPFlAhENnGWgNY")
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}

