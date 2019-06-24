// 片段着色器
#version 330 core
out vec4 FragColor;

in vec4 ourColor;

void main()
{
    FragColor = ourColor;
}