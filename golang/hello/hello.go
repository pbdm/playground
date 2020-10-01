package main

import (
	"example.com/greetings"
	"fmt"
	"log"
)

func main() {
	// Get a greeting message and print it.
	message, err := greetings.Hello("")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(message)
}
