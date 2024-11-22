function observe(obj) {
  if (!obj || typeof obj !== 'object') {
    return;
  }
  Object.keys(obj).forEach(key => {
    // 尝试递归处理
    observe(obj[key]);
    let val = obj[key];
    const dep = new Dep(); // 新建一个依赖
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      get() {
        if (Dep.target) {
          dep.depend(); // 收集依赖
        }
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        dep.notify(); // 派发更新
      }
    });
  });
}

// 依赖类
class Dep {
  constructor() {
    //依赖的订阅者
    this.subs = [];
  }
  addSub(sub) {
    this.subs.push(sub);
  }
  removeSub(sub) {
    const index = this.subs.indexOf(sub);
    if (index !== -1) {
      this.subs.splice(index, 1);
    }
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  notify() {
    this.subs.forEach(sub => sub.update());
  }
}
Dep.target = null;
// 观察者类
class Watcher {
  constructor(vm, expOrFn, callback) {
    this.vm = vm;
    this.getter = parsePath(expOrFn);
    this.callback = callback;
    this.value = this.get(); // 初始化，触发依赖
  }
  get() {
    Dep.target = this; // 设置当前依赖
    const value = this.getter.call(this.vm, this.vm); // 触发 getter
    Dep.target = null; // 清除当前依赖
    return value;
  }
  addDep(dep) {
    dep.addSub(this);
  }
  update() {
    const oldValue = this.value;
    this.value = this.get(); // 重新获取
    this.callback.call(this.vm, this.value, oldValue); // 触发回调
  }
}
// 解析路径
function parsePath(expOrFn) {
  if (typeof expOrFn === 'function') {
    return expOrFn;
  }
  const segments = expOrFn.split('.');
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) {
        return;
      }
      obj = obj[segments[i]];
    }
    return obj;
  };
}
// 测试
const obj = { foo: 'foo', bar: { a: 1 } };
observe(obj);
new Watcher(obj, 'foo', (val, oldVal) => {
  console.log(`foo changed from ${oldVal} to ${val}`);
});
new Watcher(obj, 'bar.a', (val, oldVal) => {
  console.log(`bar.a changed from ${oldVal} to ${val}`);
});
obj.foo = 'FOO'; // 输出 foo changed from foo to FOO
obj.bar.a = 2; // 输出 bar.a changed from 1 to 2