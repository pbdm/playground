package main

import (
	"example.com/greetings"
	"fmt"
	"log"
)

func main() {

	log.SetPrefix("greetings: ")
	log.SetFlags(0)

	names := []string{"Gladys", "Samantha", "Darrin"}

	// Get a greeting message and print it.
	message, err := greetings.Hello("LaLaLa")
	messages, err := greetings.Hellos(names)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(message)
	fmt.Println(messages)
}
