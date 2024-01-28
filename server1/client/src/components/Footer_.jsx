import { Footer } from "antd/es/layout/layout"

function Footer_() {
  return (
    <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Music Portal ©{new Date().getFullYear()} Created by Priti Mistry
      </Footer>
  )
}

export default Footer_
