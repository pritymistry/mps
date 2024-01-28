import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Flex,
  Select,
  TimePicker,
  InputNumber,
} from "antd";
import moment from 'moment'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from "react-redux";
import { editMusicCd, singleMusicData } from "../redux/MusicCds/MusicCdsSlice";

function EditMusicCds() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.musicCd.musicCdsDetail);
  console.log("data length : ",data.length)
  const [formData, setFormData] = useState({
    album_name: "",
    singer: "",
    composer_name: "",
    launch_date: "",
    place: "",
    genre: "",
    record_label: "",
    total_track: "",
    duration: 0,
    format: "",
    price: 0,
  });
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(singleMusicData(id));
    console.log(data);
  }, []);


  useEffect(() => {
    data &&
      data.map((d) => {
        if (d.id === Number(id)) {
          setFormData({
            album_name: d.album_name,
            singer: d.singer,
            composer_name: d.composer_name,
            launch_date: d.launch_date,
            place: d.place,
            genre: d.genre,
            record_label: d.record_label,
            total_track: d.total_track,
            duration: d.duration,
            format: d.format,
            price: d.price,
          });
          form.setFieldsValue({
            album_name: d.album_name,
            singer: d.singer,
            composer_name: d.composer_name,
            launch_date: moment(d.launch_date, "YYYY-MM-DD"),
            place: d.place,
            genre: d.genre,
            record_label: d.record_label,
            total_track: d.total_track,
            duration: moment(d.duration, "HH:mm:ss"),
            format: d.format,
            price: d.price,
          });
        }
      });
  }, [data.length]);

  let mId;
  const onFinish = () => {
    mId = Number(id);
    dispatch(editMusicCd({ formData, mId }));
    navigate(`/sellerProfile/${localStorage.getItem('id')}`)
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Flex justify="center" style={{ marginTop: "20px" }}>
      <Form
        name="Edit Music Cds"
        form={form}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 800,
        }}
        initialValues={{
          remember: true,
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item
          label="Album Name"
          name="album_name"
          rules={[
            {
              required: true,
              message: "Please input Album Name!",
            },
            { whitespace: true },
            {
              min: 2,
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="album name"
            name="album_name"
            value={formData.album_name}
            onChange={(e) => {
              setFormData({ ...formData, album_name: e.target.value });
            }}
          />
        </Form.Item>
        <Form.Item
          label="Singer"
          name="singer"
          rules={[
            {
              required: true,
              message: "Please input singer name!",
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="singer name"
            name="singer"
            value={formData.singer}
            onChange={(e) => {
              setFormData({ ...formData, singer: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Composer Name"
          name="composer_name"
          rules={[
            {
              required: true,
              message: "Please input composer name!",
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="composer name"
            name="composer_name"
            value={formData.composer_name}
            onChange={(e) => {
              setFormData({ ...formData, composer_name: e.target.value });
            }}
          />
        </Form.Item>



        <Form.Item
          label="Launch Date"
          name="launch_date"
          rules={[
            {
              required: true,
              message: "Please select launch date!",
            },
          ]}
          getValueFromEvent={(e) => e?.format("YYYY-MM-DD")}
          getValueProps={(e) => ({
            value: e ? dayjs(e) : "",
          })}
          hasFeedback
        >
          <DatePicker
            picker="date"
            name="launch_date"
            value={formData.launch_date}
            onChange={(date, dateString) => {
              setFormData({ ...formData, launch_date: dateString });
              console.log(dateString)
            }}

            placeholder="please select launch date"
          />
        </Form.Item>

        <Form.Item
          label="Place"
          name="place"
          rules={[
            {
              required: true,
              message: "Please input place!",
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="place name"
            name="place"
            value={formData.place}
            onChange={(e) => {
              setFormData({ ...formData, place: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Genre"
          name="genre"
          rules={[
            {
              required: true,
              message: "Please select!",
            },
          ]}
          hasFeedback
        >
          <Select
            name="genre"
            onChange={(value) => setFormData({ ...formData, genre: value })}
            value={formData.genre}
            placeholder="select genre"
          >
            <Select.Option value="sad"> SAD</Select.Option>
            <Select.Option value="pop"> POP</Select.Option>
            <Select.Option value="jazz"> JAZZ</Select.Option>
            <Select.Option value="party"> PARTY</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Record Label"
          name="record_label"
          rules={[
            {
              required: true,
              message: "Please input record label!",
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="reacord label"
            name="record_label"
            value={formData.record_label}
            onChange={(e) => {
              setFormData({ ...formData, record_label: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Total Track"
          name="total_track"
          rules={[
            {
              required: true,
              message: "Please input total track!",
            },
          ]}
          hasFeedback
        >
          <Input
            placeholder="total track"
            name="total_track"
            value={formData.total_track}
            onChange={(e) => {
              setFormData({ ...formData, total_track: e.target.value });
            }}
          />
        </Form.Item>

        <Form.Item
          label="Duration"
          name="duration"
          rules={[
            {
              required: true,
              message: "select an duration of your music cds",
            },
          ]}

          hasFeedback
        >
          <TimePicker
            name="duration"
            format={"HH:mm:ss"}
            value={formData.duration}
            onChange={(time, timeString) => {
              setFormData({ ...formData, duration: timeString });
              console.log(timeString);
            }}
          />
        </Form.Item>

        <Form.Item
          label="Format"
          name="format"
          rules={[{ required: true, message: "select an format" }]}
          hasFeedback
        >
          <Select
            onChange={(value) => {
              setFormData({ ...formData, format: value });
            }}
            value={formData.format}
            placeholder="select music format"
            name="format"
          >
            <Select.Option value="wav">WAV</Select.Option>
            <Select.Option value="mp4">MP4</Select.Option>
            <Select.Option value="aiff">AIFF</Select.Option>
            <Select.Option value="mp3">MP3</Select.Option>
            <Select.Option value="wma">WMA</Select.Option>
          </Select>

        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please input price",
            },
          ]}
          hasFeedback
        >
          <InputNumber
            min={1}
            name="price"
            value={formData.price}
            onChange={(value) => {
              setFormData({ ...formData, price: value });
            }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}

export default EditMusicCds;
