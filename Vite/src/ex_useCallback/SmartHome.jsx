import React, { useState, useCallback } from "react";
import Light from "./Light";

function SmartHome() {
  const [masterOn, setMasterOn] = useState(false);
  const [kitchenOn, setKitchenOn] = useState(false);
  const [bathOn, setBathOn] = useState(false);

  //useCallback을 사용하지 않은 경우
  //아래의 경우는 침실만 on을 해도 나머지 전체 함수가 다 실행된다.
//   const toggleMaster = () => {
//     setMasterOn(!masterOn);
//   };
//   const toggleKitchen = () => {
//     setKitchenOn(!kitchenOn);
//   };
//   const toggleBath = () => {
//     setBathOn(!bathOn);
//   };

  //아래는 침실, 주방, 욕실 각각 해당 dependency 값의 변경 없으면 해당 함수가 실행되지 않는다.
  const toggleMaster = useCallback(() => {
    setMasterOn(!masterOn);
  }, [masterOn]);
  const toggleKitchen = useCallback(() => {
    setKitchenOn(!kitchenOn);
  }, [kitchenOn]);
  const toggleBath = useCallback(() => {
    setBathOn(!bathOn);
  }, [bathOn]);

  console.log("SmartHome~~~");
  return (
    <div>
      <Light room="침실" on={masterOn} mToggle={toggleMaster}></Light>
      <Light room="주방" on={kitchenOn} mToggle={toggleKitchen}></Light>
      <Light room="욕실" on={bathOn} mToggle={toggleBath}></Light>
    </div>
  );
}

export default SmartHome;