import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select
  } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { useEffect, useState } from 'react';
import {getChannelsAPI} from '@/apis/article'

  const { Option } = Select
  
  const Publish = () => {
    const [channels,setChannelList] = useState([])
    useEffect(()=>{
        async function getChannelList(){
            const res = await getChannelsAPI()
            setChannelList(res.data.channels)
        }
        getChannelList()
    },[])
    return (
      <div className="publish">
        <Card
          title={
            <Breadcrumb items={[
              { title: <Link to={'/'}>首页</Link> },
              { title: '发布文章' },
            ]}
            />
          }
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ type: 1 }}
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'Please input title!' }]}
            >
              <Input placeholder="Please input title" style={{ width: 400 }} />
            </Form.Item>
            <Form.Item
              label="Channel"
              name="channel_id"
              rules={[{ required: true, message: 'Please select channel' }]}
            >
              <Select placeholder="Please select channel" style={{ width: 400 }}>
              {channels.map(item => (
                    <Option key={item.id} value={item.id}>
                    {item.name}
                    </Option>
              ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: 'Please input contents' }]}
            ></Form.Item>

            <ReactQuill
                    className="publish-quill"
                    theme="snow"
                    placeholder="Please input contents"
            />

            <Form.Item wrapperCol={{ offset: 4 }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
  
  export default Publish