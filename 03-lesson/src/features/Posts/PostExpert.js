import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from '../Posts/ReactionButtons';
import { arTN } from "date-fns/locale";

const PostExpert = ({post}) => {
    return (
        <article>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButton post={post}/>

        </article>
    )
}

export default PostExpert;