import { Button, Col, Row, Table, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SellerMusic, deleteMusicBySeller } from "../redux/MusicCds/MusicCdsSlice";


function SellerProfile() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [loading,setLoading] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Details = useSelector((state) => state.musicCd.musicCdsDetail);

  const deleteMusicCd = async(id) => {
    setLoading(true);
    await dispatch(deleteMusicBySeller(id));
    await dispatch(SellerMusic(id));
    setLoading(false);
  };
  useEffect(() => {
    const fetchData = async()=>{
      setLoading(true);
      await dispatch(SellerMusic(id));
      setLoading(false);
      if (searchQuery !== "") {
        handleSearch(searchQuery);
      }
    };

    fetchData();
   
  }, [searchQuery,Details.length]);


  const columns = [
    {
      title: "Album",
      width: 100,
      dataIndex: "album_name",
      key: "album_name",
      fixed: "left",
    },
    {
      title: "Singer",
      width: 100,
      dataIndex: "singer",
      key: "singer",
      fixed: "left",
    },
    {
      title: "Composer",
      dataIndex: "composer_name",
      key: "composer_name",
      width: 150,
    },
    {
      title: "Launch Date",
      dataIndex: "launch_date",
      key: "launch_date",
      width: 150,
    },
    {
      title: "Place",
      dataIndex: "place",
      key: "place",
      width: 150,
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
      width: 150,
    },
    {
      title: "Record Label",
      dataIndex: "record_label",
      key: "record_label",
      width: 150,
    },
    {
      title: "Total Tracks",
      dataIndex: "total_track",
      key: "total_track",
      width: 150,
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      width: 150,
    },
    {
      title: "Music CD format",
      dataIndex: "format",
      key: "format",
      width: 200,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Seller Name",
      dataIndex: "UserId",
      key: "UserId",
      width: 150,
    },
    {
      title: "Edit",
      dataIndex: "update",
      key: "update",
      width: 150,
      fixed: "right",
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      width: 150,
      fixed: "right",
      
    },
    // {
    //   title: 'Action',
    //   key: 'operation',
    //   fixed: 'right',
    //   width: 100,
    //   render: () => <a>action</a>,
    // },
  ];
  const userId = id;
  console.log("id : ",id);
  console.log("use id :",userId)
  
  const data =
    Array.isArray(Details) &&
    Details.map((musicCd) => ({
      
        key: musicCd.id,
        album_name: musicCd.album_name,
        singer: musicCd.singer,
        composer_name: musicCd.composer_name,
        launch_date: musicCd.launch_date ? new Date(musicCd.launch_date).toLocaleDateString() : "",
        place: musicCd.place,
        genre: musicCd.genre,
        record_label: musicCd.record_label,
        total_track: musicCd.total_track,
        duration: musicCd.duration,
        format: musicCd.format,
        price: musicCd.price,
        UserId: musicCd.UserId,
        update: (
          <Button
            type="text"
            onClick={() => {
              navigate(`/editMusicbySeller/${musicCd.id}`);
            }}
          >
            <EditOutlined />
          </Button>
        ),
        delete: (
          <Button type="button" onClick={() => deleteMusicCd(musicCd.id)}>
            <DeleteOutlined  />
          </Button>
        ),
      
    }));

  const handleSearch = (value) => {
    setSearchQuery(value);
    const filtered = data.filter(
      (d) =>
        d.album_name.toLowerCase().includes(value.toLowerCase()) ||
        d.singer.toLowerCase().includes(value.toLowerCase()) ||
        d.composer_name.toLowerCase().includes(value.toLowerCase()) ||
        d.place.toLowerCase().includes(value.toLowerCase()) ||
        d.genre.toLowerCase().includes(value.toLowerCase()) ||
        d.record_label.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };
  return (
    <Row justify="space-between" style={{ margin: "20px" }}>
      <Col span={10}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate(`/addMusic/${id}`)}
          size="small"
        >
          Add Music Cds
        </Button>
      </Col>
      <Col span={10}>
        <Input.Search
          placeholder="Search by album name, artist, composer, etc."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
        />
      </Col>

      <Table 
        columns={columns}
        dataSource={filteredData || data} 
        scroll={{ x: 500 }} 
        loading={loading}
      />
    </Row>
  );
}

export default SellerProfile;
