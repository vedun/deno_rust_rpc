pub fn number_from_tuple(in_data: &[u8; 4]) -> u32 {
    let d0 = in_data[0] as u32;
    let d1 = in_data[1] as u32;
    let d2 = in_data[2] as u32;
    let d3 = in_data[3] as u32;
    return (d0 << 24) | (d1 << 16) | (d2 << 8) | d3;
}

pub fn number_to_tuple(val: u32) -> [u8; 4] {
    let mut ret_val: [u8; 4] = [0, 0, 0, 0];
    ret_val[0] = ((val >> 24) & 0xff) as u8;
    ret_val[1] = ((val >> 16) & 0xff) as u8;
    ret_val[2] = ((val >> 8) & 0xff) as u8;
    ret_val[3] = (val & 0xff) as u8;
    return ret_val;
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_number_from_tuple() {
        let mut val: [u8; 4] = [0, 0, 0, 255];
        let result = number_from_tuple(&val);
        assert_eq!(result, 255u32);

        val = [0, 0, 1, 0];
        let result = number_from_tuple(&val);
        assert_eq!(result, 256u32);

        val = [0, 0, 255, 255];
        let result = number_from_tuple(&val);
        assert_eq!(result, 65535u32);

        val = [0, 1, 0, 0];
        let result = number_from_tuple(&val);
        assert_eq!(result, 65536u32);

        val = [1, 0, 0, 0];
        let result = number_from_tuple(&val);
        assert_eq!(result, 16777216u32);
    }

    #[test]
    fn test_number_to_tuple() {
        let result = number_to_tuple(255);
        assert_eq!(result, [0, 0, 0, 255]);

        let result = number_to_tuple(256);
        assert_eq!(result, [0, 0, 1, 0]);

        let result = number_to_tuple(65535);
        assert_eq!(result, [0, 0, 255, 255]);

        let result = number_to_tuple(65536);
        assert_eq!(result, [0, 1, 0, 0]);

        let result = number_to_tuple(16777216);
        assert_eq!(result, [1, 0, 0, 0]);
    }
}
