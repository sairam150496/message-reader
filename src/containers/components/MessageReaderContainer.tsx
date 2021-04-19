import { useEffect, useState, useRef } from "react";
import { MESSAGES } from "../../common";
import { MessageCard, Navbar } from "../../components";
import { v4 } from "uuid";
import { useStyles } from "../styles";
import axios from "axios";
import { IMessageCardProps } from "../../components/mui-card/interfaces";
import { IMessageResponse } from "../interfaces";
import { RouteComponentProps } from "react-router";
import FormDialog from "../../components/dialogue/components/Dialogue";

const MESSAGE_URL = "http://message-list.appspot.com/messages";

export const MessageReaderContainer = (props: RouteComponentProps) => {
  const classes = useStyles();
  const [apiResponse, setApiResponse] = useState<Map<string, IMessageResponse>>(
    new Map()
  );
  const [messages, setMessages] = useState<Map<string, IMessageCardProps>>(
    new Map()
  );
  const [ids, setIds] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [pageToken, setPageToken] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [editMessage, setEditMessage] = useState<string>("");
  const [editedMessageId, setEditedMessageId] = useState<string>("");
  const messageElement = useRef(null);

  const messageParser = (messageResponse: IMessageResponse) => {
    const messageMap = new Map<string, IMessageCardProps>();
    messageResponse.messages.forEach((message) => {
      const idToken = v4();
      messageMap.set(idToken, {
        message: message.content,
        avatar: message.author.photoUrl,
        title: message.author.name,
        subTitle: message.updated,
        onDelete: handleDeleteClick,
        onEdit: handleEditClick,
        id: idToken,
      });
    });
    return messageMap;
  };
  const handleDeleteClick = (id: string) => {
    setMessages((msgs) => {
      msgs.delete(id);
      return new Map(msgs);
    });
  };
  const handleEditClick = (id: string) => {
    setEditedMessageId(id);
    setIsOpen(true);
  };
  useEffect(() => {
    if (editedMessageId) {
      setEditMessage(messages.get(editedMessageId)!.message);
    }
  }, [editedMessageId, messages]);
  const handleCancelClick = () => {
    setEditedMessageId("");
    setEditMessage("");
    setIsOpen(false);
  };
  const handleSaveClick = () => {
    setMessages((msgs) => {
      msgs.set(editedMessageId, {
        ...msgs.get(editedMessageId)!,
        message: editMessage,
      });
      return new Map(msgs);
    });
    setEditedMessageId("");
    setEditMessage("");
    setIsOpen(false);
  };
  const handleOnMessageChange = (e: any) => {
    setEditMessage(e.target.value || "");
  };
  const getMessages = () => {
    axios.get(`${MESSAGE_URL}?pageToken=${pageToken}`).then((resp) => {
      const uId = v4();
      setIds((id) => [...id, uId]);
      setApiResponse((pastResp) => new Map(pastResp.set(uId, resp.data)));
    });
  };
  useEffect(() => {
    axios.get(MESSAGE_URL).then((resp) => {
      getMessages();
      setMessages(
        (msgs) =>
          new Map([
            ...Array.from(msgs),
            ...Array.from(messageParser(resp.data)),
          ])
      );
      setPageToken(resp.data.pageToken);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (apiResponse.size > 0 && apiResponse.size < 10) {
      getMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResponse, pageToken]);

  const handleScrollChange = (event: any) => {
    const scrollValue =
      event.target.scrollHeight -
      document.documentElement.clientHeight -
      event.target.scrollTop;
    if (scrollValue <= 1000) {
      getMessages();
    }
    if (scrollValue <= 200) {
      const currentRecSet = ids[count];

      setMessages(
        (msgs) =>
          new Map([
            ...Array.from(msgs),
            ...Array.from(messageParser(apiResponse.get(currentRecSet)!)),
          ])
      );

      setCount((cnt) => cnt + 1);
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
        {Array.from(messages).map(([key, value]) => {
          return <MessageCard {...value} key={key} />;
        })}
        {isOpen ? (
          <FormDialog
            open={isOpen}
            onCancel={handleCancelClick}
            onSave={handleSaveClick}
            onMessageChange={handleOnMessageChange}
            message={editMessage}
          />
        ) : undefined}
      </div>
    </>
  );
};
