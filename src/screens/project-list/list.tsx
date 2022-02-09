import React from "react";
import { User } from "types/user";
import { Table, TableProps } from "antd";
//react-router 和 react-router-dom的关系类似react和react-dom/react-native/react-vr
import { Link } from "react-router-dom";
import dayjs from "dayjs";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

//ListProps由Table的props和users组成
interface ListProps extends TableProps<Project> {
  users: User[];
}

//不管传入什么键值对，对象，先把users取出来，剩下的放入props
type PropsType = Omit<ListProps, "users">;
export const List = ({ users, ...props }: ListProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return (
              <Link to={`projects/${String(project.id)}`}>{project.name}</Link>
            );
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : ""}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
