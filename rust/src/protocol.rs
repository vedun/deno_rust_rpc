use crate::number::{number_from_tuple, number_to_tuple};
use std::default::Default;
use std::io::{Read, Result, Stdin, Stdout, Write};
use std::vec::Vec;

pub fn read_packet(input: &mut Stdin) -> Result<Vec<u8>> {
    let mut header: [u8; 4] = [0; 4];
    input.read_exact(&mut header)?;
    let length = number_from_tuple(&header);
    let mut body = Vec::<u8>::new();
    body.resize_with(length as usize, Default::default);
    input.read_exact(&mut body)?;
    return Ok(body);
}

pub fn write_packet(output: &mut Stdout, data: &Vec<u8>) -> Result<()> {
    let len = data.len();
    let header = number_to_tuple(len as u32);
    output.write_all(&header)?;
    output.write_all(data)?;
    output.flush()?;
    Ok(())
}
