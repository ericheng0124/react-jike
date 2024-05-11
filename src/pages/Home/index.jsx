import React from "react"
import BarChart from "@/pages/Home/components/barChart";

const Home = () => {
  return (
    <div>
      <BarChart title={'三大框架满意度'}/><BarChart title={'三大框架使用度'}/>
    </div>
  );
};

export default Home;