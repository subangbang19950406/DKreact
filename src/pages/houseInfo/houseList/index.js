import React from 'react';
import { Button ,Table} from 'antd';
// import axios from './../../../fetch/axios.js'
// import Utils from './../../../untils/index1.js'
export default class HouseList extends React.Component{
  state={

  }
  componentDidMount(){
    const data = [
        {
            id:'0',
            userName:'Jack',
            sex:'1',
            state:'1',
            interest:'1',
            birthday:'2000-01-01',
            address:'北京市海淀区奥林匹克公园',
            time:'09:00'
        },
        {
            id: '1',
            userName: 'Tom',
            sex: '2',
            state: '1',
            interest: '1',
            birthday: '2000-01-01',
            address: '北京市海淀区奥林匹克公园',
            time: '09:00'
        },
        {
            id: '2',
            userName: 'Lily',
            sex: '2',
            state: '1',
            interest: '1',
            birthday: '2000-01-01',
            address: '北京市海淀区奥林匹克公园',
            time: '09:00'
        },
    ]
    data.map((item,index)=>{
        item.key = index;
    })
    this.setState({
      dataSource: data
    })
  }
  // onRowClick=(record,index)=>{
  //   let selectKey = [index];
  //   console.log(record.userName+record.id)
  //   this.setState({
  //     selectedRowKeys:selectKey,//选的key值
  //     selectedItem:record//代表选的哪一项
  //   })
  // }
  handleChakan=(item)=>{
    console.log(item)
  }
    render(){
      const columns = [
        {
            title:'id',
            key:'id',
            dataIndex:'id'
        },
        {
            title: '用户名',
            key: 'userName',
            dataIndex: 'userName'
        },
        {
            title: '性别',
            key: 'sex',
            dataIndex: 'sex',
            render(sex){
                return sex ==1 ?'男':'女'
            }
        },
        {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render(state){
                let config  = {
                    '1':'咸鱼一条',
                    '2':'风华浪子',
                    '3':'北大才子',
                    '4':'百度FE',
                    '5':'创业者'
                }
                return config[state];
            }
        },
        {
            title: '爱好',
            key: 'interest',
            dataIndex: 'interest',
            render(abc) {
                let config = {
                    '1': '游泳',
                    '2': '打篮球',
                    '3': '踢足球',
                    '4': '跑步',
                    '5': '爬山',
                    '6': '骑行',
                    '7': '桌球',
                    '8': '麦霸'
                }
                return config[abc];
            }
        },
        {
            title: '生日',
            key: 'birthday',
            dataIndex: 'birthday'
        },
        {
            title: '地址',
            key: 'address',
            dataIndex: 'address'
        },
        {
            title: '早起时间',
            key: 'time',
            dataIndex: 'time'
        },
        {
          title:"操作",
          key:"action",
          render:(text,item)=>{
            return <Button size="small" onClick={this.handleChakan.bind(this,item)}>删除</Button>
        }
          // render:(text,item)=>{//1文本2此行的所有字段
          //     return (
          //       <p onClick={(item,text)=>{this.handleChakan(item,text)}}>查看</p>
          //     )
          // }
        }
    ]
    // const {selectedRowKeys} = this.state;

    const rowCheckSelection={
      type:"checkbox",
      // selectedRowKeys:selectedRowKeys,
      onChange:(selectedRowKeys,selectedRows)=>{//参数1当前选中的为哪一行，参数2选中的为哪些行，为对象
        console.log(selectedRowKeys)
        console.log(selectedRows)
          this.setState({//存储起来
            selectedRowKeys:selectedRowKeys,//告诉文本框选中的为哪些行，把它勾上,会变成一个数组
            selectedRows: selectedRows  //为选中的那些行，可以遍历查看各行的信息
          })
      }
    }
      return (
        <div>
              <Table 
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        rowSelection={rowCheckSelection}
                        // onRow={(record,index) => {//点击的行，record为选中的那行的信息
                        //   return {
                        //     onClick: () => {
                        //       this.onRowClick(record,index);
                        //     }
                        //   }
                        // }}
                  />
        </div>
      )
    }
}

// class Search extends React.Component{
    
// }
// Search = Form.create({})(Search);