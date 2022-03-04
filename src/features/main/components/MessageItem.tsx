import moment from "moment";
import useWindowSize from "../../../app/utils/useWindowSize";
import { IComment } from "../interfaces/IComment";

interface Props {
    data: IComment;
}

const MessageItem = (props: Props) => {
    const { parentId, author, text, timestamp } = props.data;

    return <div className={`message ${parentId ? 'message--reply' : ''}`}>
        <div className="flex">
            <img className="message__img" src={author.picture} alt="profile avatar" />
            <div className="message__bubble">
                <div className="type--wgt--bold mb-3">{author.name}</div>
                <div className={`type--color--secondary ${useWindowSize().width < 1000 && 'type--break'}`}>{text}</div>
            </div>
        </div>
        <div className="message__footer">
            <span className="type--color--secondary">{moment(timestamp).format('HH:mm')}</span>
            <span className="message__dot"></span>
            <span className="message__btn">Reply</span>
        </div>
    </div>
}

export default MessageItem;