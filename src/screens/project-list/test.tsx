import { useEffect, useState } from "react";
import { useMount } from "utils";

const test = () => {
  let num = 0;
  const effect = () => {
    num += 1;
    const message = `现在的numb值${num}`;
    return function unmount() {
      console.log(message);
    };
  };
  return effect;
};
//执行test，返回effect函数
const add = test();
//执行effect函数，返回应用了message1的unmount函数
const unmount = add();
//再一次执行effect函数，返回应用了message2的unmount函数
add();
//再一次执行effect函数，返回应用了message3的unmount函数
add();
//执行effect函数，返回应用了message4的unmount函数
unmount();

//react hook 与闭包， hook 与闭包经典坑
export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("num in setInterval", num);
    }, 1000);
    return () => clearInterval(id);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log("卸载值", num);
    };
  }, [num]);
  return (
    <div>
      <button onClick={add}>add</button>
      number: {num}
    </div>
  );
};
