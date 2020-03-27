// http://www.runoob.com/cplusplus/cpp-classes-objects.html
#include <iostream>
using namespace std;

class Box {
 private:
  double width;
 public:
  // 构造函数
  Box() {
    objectCount++;
    cout << "Box is being created" << endl;
  };
  Box(double w): width(w) {
    // 上面这么写等于  width = w;
    cout << "Box width " << width << " is being created" << endl;
  };
   
  // 析构函数 在每次删除所创建的对象时执行
  ~Box() {
    cout << "Box is being deleted" << endl;
  };
  double height;
  // 成员函数声明
  double getWidth(void);
  void setWidth(double w);

  static int objectCount;

  // 友元函数 定义在类外部，但有权访问类的所有私有（private）成员和保护（protected）成员
  friend void printWidth(Box box);

  // 重载 + 运算符, 当两个 Box 相加的时候运行
  Box operator+(const Box& b) {
    Box box;
    box.height = this->height + b.height;
    return box;
  }

  // 标准函数
  void fn() {
    cout << "call box fn" << endl;
  }
  // 虚函数
  virtual void virtualFn() {
    cout << "call box virtualFn" << endl;
  }

  // double *pvs = NULL; // 初始化为 null 的指针
  // // pv  = new double;   // 为变量请求内存
  // pvs = 29494.99;     // 在分配的地址存储值
};

double Box::getWidth(void) {
  // 等于是 return width
  return this->width;
}

void Box::setWidth(double w) {
  width = w;
}

// 定义静态成员
int Box::objectCount = 0;

// printHeight() 不是任何类的成员函数
void printHeight(Box box) {
  /* 因为 printHeight() 是 Box 的友元，它可以直接访问该类的任何成员 */
  cout << "Width of box : " << box.height << endl;
}

// 派生类(继承)
class SmallBox : public Box {
 public:
  SmallBox(): Box() {
    // cout << "SmallBox is being created" << endl;
  };
  // 析构函数 在每次删除所创建的对象时执行
  ~SmallBox() {
    cout << "SmallBox is being deleted" << endl;
  };
  void fn() {
    cout << "call smallbox fn" << endl;
  };
  void virtualFn() {
    cout << "call smallbox virtualFn" << endl;
  };
};

// class Bis{
//  public:
//   Bis();
// };

int main() {
  // Bis bis = Bis();
  Box box = Box(4);
  SmallBox smallBox;
  Box* ptrBox = &box;

  box.height = 5.0;
  smallBox.height = 3.0;
  smallBox.setWidth(2.0);

  printHeight(box);
  cout << "box height: " << box.height << endl;
  cout << "box width: " << box.getWidth() << endl;
  cout << "box width from ptr: " << ptrBox->getWidth() << endl;

  // 这里 + 运算符被重载了
  Box Box3 = box + smallBox;
  cout << "total height: " << Box3.height << endl;  // 8

  // 多态, 虚函数
  Box *vBox = new SmallBox();
  smallBox.fn(); // call small box fn
  smallBox.virtualFn(); // call smallbox virtlalfn
  vBox->fn(); // call box fn
  vBox->virtualFn();// call smallbox virtualFn

  // 一共创建过 3 个实例 
  cout << "Total objects: " << Box::objectCount << endl;
  return 0;
}
