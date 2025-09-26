import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { dummyPostsData, dummyUserData } from '../assets/assets';
import Loading from '../components/Loading';
import UserProfileInfo from '../components/UserProfileInfo';
import PostCard from '../components/PostCard';
import moment from 'moment';
import EditProfile from '../components/EditProfile';

const Profile = () => {

  const { profileId } = useParams();
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('posts')
  const [showEdit, setShowEdit] = useState(false)

  const fetchUser = async () => {
    setUser(dummyUserData)
    setPosts(dummyPostsData)
  }

  useEffect(() => {
    fetchUser()
  },[])

  return user ? (
    <div className='relative h-full overflow-y-scroll bg-gray-50 p-6'>
       <div className='max-w-3xl mx-auto'>

        {/* Profile Card */}

        <div className='bg-white rounded-2xl shadow overflow-hidden'>
          {/* Cover Photo */}

          <div className='h-40 md:h-56 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200'>
         {
          user.cover_photo && <img src={user.cover_photo} className='w-full h-full object-cover'  />
         }
          </div>
          
          {/* User Info */}
           
           <UserProfileInfo user={user} profileId={profileId} posts={posts} setShowEdit={setShowEdit} />
        </div>

        {/* Tabs */}

        <div className='mt-6 '>
              <div className='bg-white rounded-xl shadow p-1 flex max-w-md mx-auto'>
                {["posts", "media","likes"].map((item) => (
                  <button onClick={() => setActiveTab(item)} key={item} className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${activeTab === item ? "bg-indigo-600 text-white" : "text-gray-600 hover:text-gray-900"}`}>
                        { item.charAt(0).toUpperCase() + item.slice(1) }
                  </button>
                ))}
              </div>
              {/* Posts */}
              {activeTab === 'posts' && (
                <div className='mt-6 flex flex-col items-center gap-6'>
                  {posts.map((post) => <PostCard post={post} key={post._id} />)}
                </div>
              )}

              {/* Media */}

              {activeTab === 'media' && (
                <div className='flex flex-wrap mt-6 max-w-6xl'>
                   { posts.filter(post => post.image_urls.length > 0).map((post) => (
                    <>
                    
                    {post.image_urls.map((image,index) => (
                      <Link target='_black' to={image} key={index} className='relative group'>
                       <img src={image} key={index} className=' w-64 aspect-video object-cover ' alt="" />
                       <p className='absolute bottom-0 right-0 text-xs px-3 backdrop-blur-xl text-white opacity-0 group-hover:opacity-100 transition duration-300'>Posted {moment(post.createdAt).fromNow()}</p>
                      </Link>
                    ))}
                    </>
                   )) }
                </div>
              )}
        </div>
       </div>

       {/* Edit Profile Modal */}

       {showEdit && <EditProfile setShowEdit={setShowEdit} /> }
    </div>
  ) : (
    <Loading />
  )
}

export default Profile
