import Footer from "@components/Footer";

export default function NewsDetail({ post }) {

 const {title, content} = post

   function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
    return str.replace( /(<([^>]+)>)/ig, '');
  }
  const contentStripString = removeTags(content)

  return (
    <div>
      <main>
        <h3>{title}</h3>
        <p> {contentStripString} </p>
      </main>
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch("https://www.googleapis.com/blogger/v3/blogs/2399953/posts?key=AIzaSyDGNC0zC-0HtxKxYM0VbMPFlAhENnGWgNY");
  const posts = await res.json();
    const sortedPost = posts.items.sort(function (a, b) {
        return a.published - b.published;
    })
  const recentPosts = [];

  //we want only the first three posts to be generated on build times 
  // and the rest posts to be generated only on request

  for (let index = 0; index < 3; index++) {
      recentPosts.push(sortedPost[index]);
      
  }

  const paths = recentPosts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  /*
  console.log(paths)
  [
    { params: { id: '1' } },
    { params: { id: '2' } },
    { params: { id: '3' } }
  ]
  The paths above will be generated at build time
  */

  return { paths, fallback: false };
}

export async function getStaticProps({params}) {
  const res = await fetch(`https://www.googleapis.com/blogger/v3/blogs/2399953/posts/${params.id}?key=AIzaSyDGNC0zC-0HtxKxYM0VbMPFlAhENnGWgNY`)
  const post = await res.json();
  return {
    props: {
      post,
    },
  };
}