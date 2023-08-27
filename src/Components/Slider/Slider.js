import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import "./Slider.css";


export default function SlideShow() {
    return (
      <div className="slide-container">
        
<Slide autoplay={true}>
  <div className="each-slide-effect">
    <div
      style={{
        backgroundImage: 'url(https://cdn.wccftech.com/wp-content/uploads/2019/07/NVIDIA-RTX-SUPER_3.png)'
      }}
    >
    </div>
  </div>
  <div className="each-slide-effect">
    <div
      style={{
        backgroundImage: 'url(https://back2gaming.com/wp-content/uploads/2022/04/nvidia-restocked-and-reloaded-philipines.jpg)'
      }}
    >
    </div>
  </div>
  <div className="each-slide-effect">
    <div
      style={{
        backgroundImage: 'url(https://www.cgdirector.com/wp-content/uploads/media/2020/12/AMD-GPUs-in-Order-of-Performance-Twitter_1200x675.jpg)'
      }}
    >
    </div>
  </div>
</Slide>
      </div>
    )
}
