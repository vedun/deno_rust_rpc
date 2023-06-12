mod number;
mod protocol;

use std::io;
use std::process::ExitCode;
// use std::thread::sleep;
// use std::time::Duration;
use std::vec::Vec;

fn main() -> ExitCode {
    let mut stdin = io::stdin();
    let mut stdout = io::stdout();
    let mut output_buf = Vec::<u8>::with_capacity(1);
    output_buf.push(128);
    // let mut iteration = 0;
    loop {
        // eprintln!("rust: iteration {}", iteration);
        // iteration += 1;
        match protocol::read_packet(&mut stdin) {
            Err(e) => {
                eprintln!("rust error: {}", e);
                return ExitCode::FAILURE;
            }
            Ok(_) => (),
        }
        // eprintln!("rust receive packet: {:?}", packet);
        match protocol::write_packet(&mut stdout, &output_buf) {
            Err(e) => {
                eprintln!("rust error: {}", e);
                return ExitCode::FAILURE;
            }
            Ok(_) => {}
        }
        // sleep(Duration::from_millis(1500));
    }
}
