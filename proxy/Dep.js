let uid = 0;
/**
 * 发布订阅 中心
 */
class Dep {
    static target = null;
    constructor() {
        this.uid = uid++;
        this.subs = [];
    }

    depend() {
        Dep.target.addDep(this);
    }

    addDep(sub) {
        this.subs.push(sub);
    }
    notify() {
        this.subs.forEach((sub) => sub.update());
    }
}
