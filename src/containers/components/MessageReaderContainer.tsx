import { useEffect, useState, useRef } from "react";
import { MESSAGES } from "../../common";
import { MessageCard, Navbar } from "../../components";

import { useStyles } from "../styles";
import axios from "axios";
import { IMessageCardProps } from "../../components/mui-card/interfaces";
import { IMessageResponse } from "../interfaces";

const MESSAGE_URL = "http://message-list.appspot.com/messages";

export const messageParser = (
  prevMsgs: Map<
    string,
    | {
        [key: string]: IMessageCardProps;
      }
    | string
  >,
  messageResponse: IMessageResponse
) => {
  messageResponse.messages.forEach((message) => {
    prevMsgs.set(`${prevMsgs.size}`, {
      message: message.content,
      avatar: message.author.photoUrl,
      title: message.author.name,
      subTitle: message.updated,
    } as any);
    return "";
  });
  prevMsgs.set("pageToken", messageResponse.pageToken as string);
  return prevMsgs;
};

export const MessageReaderContainer = () => {
  const classes = useStyles();
  const messageElement = useRef(null);
  const [messageCard, setMessageCard] = useState<IMessageCardProps[]>([]);
  const [messageResponse, setMessageResponse] = useState<
    Map<
      string,
      | {
          [key: string]: IMessageCardProps;
        }
      | string
    >
  >(new Map());

  useEffect(() => {
    axios.get(MESSAGE_URL).then((resp) => {
      setMessageResponse(
        (prevMsgs) => new Map(messageParser(prevMsgs, resp.data))
      );
    });
  }, []);

  const getElementsBtwRange = (from: number, to: number) => {
    const messageArr: any = [];
    // console.log(messageResponse, messageResponse.size, from);
    if (!(messageResponse.size > from + 1)) return messageArr;
    for (let i = from + 1; i <= to; i++) {
      messageArr.push(
        <>
          <MessageCard
            key={i.toString()}
            subTitle={(messageResponse.get(`${i}`) as any)["subTitle"]}
            avatar={(messageResponse.get(`${i}`) as any)["avatar"]}
            title={(messageResponse.get(`${i}`) as any)["title"]}
            message={(messageResponse.get(`${i}`) as any)["message"]}
            onDelete={() => {}}
          />
        </>
      );
    }
    return messageArr;
  };

  useEffect(() => {
    if (messageResponse.size && messageResponse.size <= 11) {
      const messageArr: any = [];
      messageResponse.forEach((value: any, key: string) => {
        if (!isNaN(parseInt(key)))
          messageArr.push(
            <>
              <MessageCard
                key={key}
                subTitle={value["subTitle"]}
                avatar={value["avatar"]}
                title={value["title"]}
                message={value["message"]}
                onDelete={() => {}}
              />
            </>
          );
      });
      setMessageCard((msg) => msg.concat(messageArr));
    }
  }, [messageResponse]);

  const handleScrollChange = (event: any) => {
    // console.log(event);
    const value =
      event.target.scrollHeight -
      (messageElement.current as any).clientHeight -
      event.target.scrollTop;
    if (value <= 600) {
      axios
        .get(`${MESSAGE_URL}?pageToken=${messageResponse.get("pageToken")}`)
        .then((resp) => {
          setMessageResponse(
            (prevMsgs) => new Map(messageParser(prevMsgs, resp.data))
          );
        });
    }
    if (value <= 200) {
      setMessageCard((msgs) =>
        msgs.concat(
          getElementsBtwRange(messageCard.length, messageCard.length + 10)
        )
      );
    }
  };

  return (
    <>
      <Navbar navBarTitle={MESSAGES} />
      <div
        className={classes.cardStyle}
        ref={messageElement}
        onScroll={handleScrollChange}
      >
        {messageCard}
      </div>
    </>
  );
};
