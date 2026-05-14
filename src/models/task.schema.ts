import Realm from "realm";

export class Task extends Realm.Object<Task> {
  id!: string;
  userId!: string;
  title!: string;
  description?: string;
  status!: string;
  synced!: boolean;
  createdAt!: Date;
  updatedAt!: Date;

  static schema: Realm.ObjectSchema = {
    name: "Task",
    primaryKey: "id",
    properties: {
      id: "string",
      userId: "string",
      title: "string",
      description: "string?",
      status: { type: "string", default: "pending" },
      synced: { type: "bool", default: false },
      createdAt: "date",
      updatedAt: "date",
    },
  };
}