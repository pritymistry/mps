import { Col, Row } from 'antd';
import AllMusicList from './AllMusicList';

function Home() {
  return (
    <>
      <Row>
      <Col span={24}>
      <AllMusicList/>
      </Col>
      </Row>
    </>
  )
}

export default Home