#include <iostream>
#include <thread>
#include <chrono>

const char header[] = {0x00, 0x00, 0x00, 0x16}; // 22 байта

/*
{
  "status": "success",
  "data": ""
}
*/
const char response_data[] = {
    static_cast<char>(0x82),
    static_cast<char>(0xA6),
    static_cast<char>(0x73),
    static_cast<char>(0x74),
    static_cast<char>(0x61),
    static_cast<char>(0x74),
    static_cast<char>(0x75),
    static_cast<char>(0x73),
    static_cast<char>(0xA7),
    static_cast<char>(0x73),
    static_cast<char>(0x75),
    static_cast<char>(0x63),
    static_cast<char>(0x63),
    static_cast<char>(0x65),
    static_cast<char>(0x73),
    static_cast<char>(0x73),
    static_cast<char>(0xA4),
    static_cast<char>(0x64),
    static_cast<char>(0x61),
    static_cast<char>(0x74),
    static_cast<char>(0x61),
    static_cast<char>(0xA0)};

void write_response()
{
  std::cout.write(header, 4);
  std::cout.write(response_data, 22);
}

u_int32_t uint_from_bytes(const char bytes[])
{
  auto d0 = bytes[0];
  auto d1 = bytes[1];
  auto d2 = bytes[2];
  auto d3 = bytes[3];
  return (d0 << 24) | (d1 << 16) | (d2 << 8) | d3;
}

int main()
{
  using namespace std::chrono_literals;
  std::ios_base::sync_with_stdio(false);

  const int HEADER_LEN = 4;
  const int PACKET_LEN = 1024;
  char header[HEADER_LEN];
  char packet[HEADER_LEN];
  while (true)
  {
    std::cin.read(header, HEADER_LEN);
    auto len = uint_from_bytes(header);
    if (len > PACKET_LEN)
    {
      std::cerr << "packet to big" << std::endl;
      return 1;
    }
    std::cin.read(packet, len);
    write_response();
    // std::this_thread::sleep_for(5ms);
  }

  return 0;
}
