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
        <p style={{width: "85%", textAlign: "center"}}> {contentStripString} </p>
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
  const recentPosts = [sortedPost[0]];

  const paths = recentPosts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  /*
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