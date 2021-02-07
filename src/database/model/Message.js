import { Model } from '@nozbe/watermelondb';
import {
	field, date, json
} from '@nozbe/watermelondb/decorators';

export default class Message extends Model {
	static table = 'messages';

	@field('msg') msg;

	@field('t') t;

	@field('room_id') roomId;

	@json('user') user;

	@json('attachments') attachments;

	@field('unread') unread;

	@date('edited_at') editedAt;

	@json('edited_by') editedBy;

	@json('deleted_by') deletedBy;

	@date('is_deleted') isDeleted;

}
