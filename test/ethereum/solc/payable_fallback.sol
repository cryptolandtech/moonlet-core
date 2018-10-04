pragma solidity ^0.4.24;

contract Test {
    
    function () public payable {
        
        assembly {
            // gas to waste
            let BytesToStore := 1024
            
            // load free memory pointer
            let pointer := mload(0x40)
            
            for { let n := 0 } lt(n, BytesToStore ) { n := add(n, 8) } {
                mstore( add( pointer, n ), 0x32 )
            }
            
            for { let n := 0 } lt(n, BytesToStore ) { n := add(n, 8) } {
                let x := mload( add( pointer, n ) )
            }
            // mstore( pointer, 64 )
        }
    }
    
}