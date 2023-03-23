import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getPostStatus, getPostError, fetchPosts } from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from '../Posts/ReactionButtons';
import {useEffect} from 'react';

const PostList = () => {
    const posts = useSelector(selectAllPosts)

    const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date));

    const renderPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButton post={post}/>
        </article>
    ))

    return (
        <section>
            <h2>Posts</h2>
            {renderPosts}
        </section>
    )
}

export default PostList;
