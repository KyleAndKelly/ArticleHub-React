import { Link } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import {getChannelsAPI,getArticleListAPI} from '@/apis/article'
// import img404 from '@/assets/error.png'


const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
    const [channels,setChannelList] = useState([])
    useEffect(()=>{
        async function getChannelList(){
            const res = await getChannelsAPI()
            setChannelList(res.data.channels)
        }
        getChannelList()
    },[])
    const [article, setArticleList] = useState({
        list: [],
        count: 0
    })
    
    const [params, setParams] = useState({
      page: 1,
      per_page: 4,
      begin_pubdate: null,
      end_pubdate: null,
      status: null,
      channel_id: null
    })
    
    useEffect(() => {
      async function fetchArticleList () {
        const res = await getArticleListAPI(params)
        const { results, total_count } = res.data
        setArticleList({
          list: results,
          count: total_count
        })
      }
      fetchArticleList()
    }, [params])
    const columns = [
        {
          title: 'Cover',
          dataIndex: 'cover',
          width: 120,
          render: cover => {
            return <img src={cover.images[0] } width={80} height={60} alt="" />
          }
        },
        {
          title: 'Title',
          dataIndex: 'title',
          width: 220
        },
        {
          title: 'Staus',
          dataIndex: 'status',
          render: data => <Tag color="green">审核通过</Tag>
        },
        {
          title: 'time',
          dataIndex: 'pubdate'
        },
        {
          title: 'views',
          dataIndex: 'read_count'
        },
        {
          title: 'comments',
          dataIndex: 'comment_count'
        },
        {
          title: 'likes',
          dataIndex: 'like_count'
        },
        {
          title: 'more',
          render: data => {
            return (
              <Space size="middle">
                <Button type="primary" shape="circle" icon={<EditOutlined />} />
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
              </Space>
            )
          }
        }
      ]
    const data = [
    {
        id: '8218',
        comment_count: 0,
        cover: {
        images: [],
        },
        like_count: 0,
        pubdate: '2019-03-11 09:00:00',
        read_count: 2,
        status: 2,
        title: 'wkwebview离线化加载h5资源解决方案'
    }
    ]
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>Home</Link> },
            { title: 'Article List' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }}>
          <Form.Item label="Status" name="status">
            <Radio.Group>
              <Radio value={''}>All</Radio>
              <Radio value={0}>Draft</Radio>
              <Radio value={2}>Submitted</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Channel" name="channel_id">
            <Select placeholder="Please select channel" style={{ width: 400 }}>
                {channels.map(item => (
                        <Option key={item.id} value={item.id}>
                        {item.name}
                        </Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date">
            <RangePicker ></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              Filter
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`Total ${article.count} Results:`}>
        <Table rowKey="id" columns={columns} dataSource={article.list} />
      </Card>
    </div>
  )
}

export default Article