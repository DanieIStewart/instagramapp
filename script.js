// holds users details
const userProfile = []; 
const hashtags = [];

const makeCards = (user) => {
  console.log(user)
  const { full_name, profile_pic_url_hd, biography, is_private, username } = user 
  const followers = user.edge_followed_by.count
  const following = user.edge_follow.count
  const profileLink = `https://www.instagram.com/${username}/`

  document.querySelector('#name').textContent = full_name
  document.querySelector('#name').innerHTML = `
  <div class="card" style="width: 18rem;">
      <img src="${profile_pic_url_hd}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${full_name}</h5>
      <p class="card-text">
        ${biography}
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Followers ${followers}</li>
      <li class="list-group-item">Following ${following}</li>
      <li class="list-group-item">Private profile ${is_private}</li>
    </ul>
    <div class="card-body">
      <a href="${profileLink}" class="card-link">Visit Profile</a>
    </div>
  </div>
  `
}
const makeHashTagsCards = (hashtag) => {
 const media = hashtag.edge_hashtag_to_media
 const hashTagArea = document.querySelector('#hastags');
 const { edges } = media
//  hashtags.push(edges)
 edges.map((tag) => {
   console.log(tag)
  let div = document.createElement("div");  
  div.innerHTML= `
  <div class="card" style="width: 18rem;">
      <img src="${tag.node.thumbnail_src}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">hastag</h5>
      <p class="card-text">
        example
      </p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">Followers exmaple</li>
    </ul>
    <div class="card-body">
      <a href="" class="card-link">Visit Profile</a>
    </div>
  </div>
  `
  document.querySelector('#hastags').appendChild(div)

  // document.querySelector('#hastags').innerHTML= `
  // <div class="card" style="width: 18rem;">
  //     <img src="${tag.node.thumbnail_src}" class="card-img-top" alt="...">
  //   <div class="card-body">
  //     <h5 class="card-title">hastag</h5>
  //     <p class="card-text">
  //       example
  //     </p>
  //   </div>
  //   <ul class="list-group list-group-flush">
  //     <li class="list-group-item">Followers exmaple</li>
  //   </ul>
  //   <div class="card-body">
  //     <a href="" class="card-link">Visit Profile</a>
  //   </div>
  // </div>
  // `
 })
}

async function getFollowers(username) {
  try {
    const { data } = await axios.get(`https://www.instagram.com/${username}/?__a=1`)
    // console.log(data.graphql)
    const user = data.graphql.user

    userProfile.push(user)
    makeCards(user)

    let followers = user.edge_followed_by.count
    let following = user.edge_follow.count
    let fullname = user.full_name
    let user_name = user.username
    let profile_pic = user.profile_pic_url_hd
    console.log(`${user_name} has ${followers} and follows ${following}. His full name is ${fullname}. His pic is ${profile_pic}`)
  } catch (error) {
   console.log(error)
  }
 }

async function getHashtag(tag) {
  try {
    const { data } = await axios.get(`https://www.instagram.com/explore/tags/${tag}/?__a=1`)
    makeHashTagsCards(data.graphql.hashtag)
  } catch (error) {
   console.log(error)
  }
 }

  document.getElementById("instagram-username").addEventListener('change', (e) => {
    getFollowers(e.target.value)
    getHashtag(e.target.value)
  })