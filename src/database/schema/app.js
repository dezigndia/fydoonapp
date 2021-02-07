import { appSchema, tableSchema } from '@nozbe/watermelondb'

export const mySchema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'messages',
            columns: [
                { name: 'msg', type: 'string', isOptional: true },
                { name: 't', type: 'string', isOptional: true },
                { name: 'room_id', type: 'string', isIndexed: true },
                { name: 'user', type: 'string', isOptional: true },
                { name: 'attachments', type: 'string', isOptional: true },
                { name: 'unread', type: 'boolean', isOptional: true },
                { name: 'edited_at', type: 'string', isOptional: true },
                { name: 'edited_by', type: 'string', isOptional: true },
                { name: 'deleted_by', type: 'string', isOptional: true },
                { name: 'is_deleted', type: 'boolean', isOptional: true },
            ]
        })
    ]
})