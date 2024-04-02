import {
	Avatar,
	ChatContainer,
	ConversationHeader,
	Message,
	MessageInput,
	MessageList,
	MessageSeparator,
} from '@chatscope/chat-ui-kit-react';
import { v4 as uuidv4 } from 'uuid';
import { pushChatMessage } from '../../store/chat/chatSlice';
import { RootState, useAppDispatch, useAppSelector } from '../../store';

const ChatContent = () => {
	const dispatch = useAppDispatch();
	const { chat, currentUser } = useAppSelector(
		(state: RootState) => state.chat
	);
	const currentChat = chat[currentUser];
	if (!currentChat) {
		return null;
	}
	const { messages, type, userThumbnail } = currentChat;

	return (
		<ChatContainer>
			<ConversationHeader>
				<ConversationHeader.Back />
				<Avatar name={currentUser} src={userThumbnail} />
				<ConversationHeader.Content userName={currentUser} />
			</ConversationHeader>
			<MessageList>
				<MessageSeparator content={`Model: ${type}`} />
				{messages.map((message) => (
					<Message
						key={message.id}
						model={{ ...message, position: 'normal' }}
					/>
				))}
			</MessageList>
			<MessageInput
				placeholder='Type message here'
				onSend={(_, textContent) =>
					dispatch(
						pushChatMessage({
							id: uuidv4(),
							direction: 'outgoing',
							message: textContent,
							sender: 'User',
						})
					)
				}
			/>
		</ChatContainer>
	);
};

export default ChatContent;
