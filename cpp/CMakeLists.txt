cmake_minimum_required(VERSION 3.21)

project(rpc_service LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(rpc_service ./src/main.cpp)
