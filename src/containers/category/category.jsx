import React, { Component } from 'react'
import { Button, Card,Table } from 'antd';
import{PlusOutlined}from'@ant-design/icons'
export default class Category extends Component {
  
  render() {
    const dataSource = [
      {
        key: '1',
        name: '男士西服',
        money : '200$'
      },
      {
        key: '2',
        name: '男士上衣',
        money: '320$',
      },
    ];
    
    const columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '操作',
        dataIndex: 'money',
        key: 'address',
      },
    ];
    return (
      <Card  extra={<Button type='primary'>{<PlusOutlined/>}添加</Button>}>
      <Table dataSource={dataSource} columns={columns} />;
    </Card>
    )
  }
}
