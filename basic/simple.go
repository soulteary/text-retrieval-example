package main

import (
	"strings"
)

func SimpleMatch(str1, str2 string) bool {
	if len(str1) >= len(str2) {
		return strings.Contains(str1, str2)
	}
	return strings.Contains(str2, str1)
}
