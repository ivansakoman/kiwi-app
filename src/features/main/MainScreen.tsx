import moment from "moment";
import { useEffect, useRef, useState } from "react";
import toastService from "../../app/services/toastService";
import { IComment } from "./interfaces/IComment";
import { useAddCommentMutation, useLazyGetCommentsQuery } from "./services/mainService";
import { v4 as uuidv4 } from 'uuid';
import useWindowSize from "../../app/utils/useWindowSize";
import { groupBy } from 'lodash';
import Loader from "../../app/components/Loader";
import MessageItem from "./components/MessageItem";

interface IGroupedComments {
    [date: string]: IComment[];
}

const MainScreen = () => {

    const [getComments, { isLoading: commentsLoading, isUninitialized: commentsUninitialized }] = useLazyGetCommentsQuery();
    const [addComment] = useAddCommentMutation();

    const [inputValue, setInputValue] = useState<string>('');
    const [commentsData, setCommentsData] = useState<IGroupedComments>({});

    const bottomRef = useRef<HTMLDivElement>(null);
    const bottomRefElement = bottomRef.current as HTMLDivElement;
    const isLoading = commentsLoading || commentsUninitialized;

    const fetchData = async () => {
        try {
            const response = await getComments().unwrap();
            const groupedResponse = groupBy(response, (result: IComment) => moment(result['timestamp']).format('DD/MM/YYYY'))
            setCommentsData(groupedResponse);
        } catch (error) {
            toastService.success('Error with fetching comments')
        }
    }

    const handleInputChange = (value: string) => {
        setInputValue(value)
    }

    const handleSend = async () => {
        const toSend: IComment = {
            author: {
                name: 'Marko Fuček',
                picture: 'https://source.unsplash.com/random/?breakdance'
            },
            id: uuidv4(),
            text: inputValue,
            timestamp: moment().valueOf(),
        }
        try {
            await addComment(toSend).unwrap()
            setInputValue('');
            const response = await getComments().unwrap();
            const groupedResponse = groupBy(response, (result: IComment) => moment(result['timestamp']).format('DD/MM/YYYY'))
            setCommentsData(groupedResponse);
            bottomRefElement.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            toastService.error('Something went wrong! Please try to send message again!')
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return <div className="layout">
        <div className="layout__main">
            <div className="chat">
                <div className={`chat__body ${isLoading && 'chat__body--loading'}`}>
                    {
                        (isLoading && <Loader />) || Object.keys(commentsData).map((key: string) => {
                            return <div>
                                <div className="chat__body__time">{key === moment().format('DD/MM/YYYY') ? 'Today' : key}</div>
                                {
                                    commentsData[key].map((comment: IComment, index: number) => {
                                        return <MessageItem key={index} data={comment} />
                                    })
                                }
                            </div>
                        })
                    }
                    <div ref={bottomRef}></div>
                </div>
                <div className="chat__input">
                    <div className="flex--shrink">
                        <div className="btn btn--base btn--primary"><i className="icon icon--base icon--white icon--plus"></i></div>
                    </div>
                    <input className="input input--base input--chat" placeholder="Type your message here" type="text" value={inputValue} onChange={(e) => handleInputChange(e.target.value)} />
                    <button className="btn btn--base btn--primary flex--shrink" onClick={() => handleSend()}>
                        <i className="icon icon--base icon--white icon--send"></i>
                        {
                            useWindowSize().width > 550 && <span className="d--ib ml-3">Send message</span>
                        }

                    </button>
                </div>
            </div>
        </div>
    </div>
}

export default MainScreen;