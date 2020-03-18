// http://www.runoob.com/cplusplus/cpp-classes-objects.html
#include <iostream>
using namespace std;

class Box
{
  double width;
  public:
    static int objectCount;
    double length;   // Length of a box
    double breadth;  // Breadth of a box
    double height;   // Height of a box
    void callMe(void);
  // 构造函数
  Box();
  // 析构函数 在每次删除所创建的对象时执行
  ~Box();
  // TODO 拷贝构造函数
  // Box( const Box &obj);      

  // 友元函数 定义在类外部，但有权访问类的所有私有（private）成员和保护（protected）成员
  friend void printWidth( Box box );
  // 重载 + 运算符, 当两个 Box 相加的时候运行
  Box operator+(const Box& b)
  {
    Box box;
    box.height = this->height+ b.height;
    return box;
  }
  // 成员函数声明
  double getWidth(void);
  void setWidth(double wid);
  // TODO 多态, 虚函数virtual(接口interface?)
  //
  // double *pvs = NULL; // 初始化为 null 的指针
  // // pv  = new double;   // 为变量请求内存
  // pvs = 29494.99;     // 在分配的地址存储值
};
// SmallBox 是派生类, 默认的继承方式为 private
// class SmallBox: Box 
class SmallBox: public Box
{

};

Box::Box(void) {
  cout << "Object is being created" << endl;
}
Box::~Box(void)
{
  cout << "Object is being deleted" << endl;
}

void Box::callMe(void) {
  cout << "called me" << endl;
}

double Box::getWidth(void) {
  // 和 js 不一样, this 为指针
  // return this->width;
  return width;
}

void Box::setWidth( double wid )
{
    width = wid;
}

// 请注意：printWidth() 不是任何类的成员函数
void printHeight( Box box )
{
   /* 因为 printWidth() 是 Box 的友元，它可以直接访问该类的任何成员 */
   cout << "Width of box : " << box.height <<endl;
}

// 内联函数 解决程序中函数调用的效率问题,  只有当函数只有 10 行甚至更少时才将其定义为内联函数
inline int Max(int x, int y)
{
   return (x > y)? x : y;
}
int Box::objectCount = 0;
int main() {
  Box Box1;
  SmallBox Box2;
  Box1.height = 5.0;
  Box1.setWidth(2.0);
  Box2.height = 5.0;
  Box2.setWidth(2.0);
  Box *ptrBox = &Box1;
  printHeight( Box1 ); // 5
  double v = Box1.height;
  cout << v << endl; //5
  cout << Box1.getWidth() << endl; //2
  cout << ptrBox->getWidth() << endl; //2

  cout << "Total objects: " << Box::objectCount << endl; // 0

  // 这 + 运算符被重载了
  Box Box3 = Box1 + Box2;
  cout << Box3.height << endl; // 10
  Box1.callMe();
  return 0;
}

