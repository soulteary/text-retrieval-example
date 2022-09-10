package main

import (
	"fmt"
	"testing"
)

func TestSimilarText(t *testing.T) {
	var tests = []struct {
		A string
		B string
	}{
		{"西风吹老洞庭波，一夜湘君白发多。", "洞庭湖"},
		{"醉后不知天在水，满船清梦压星河。", "满船清梦"},
		{"2022", "2023"},
		{"真不错", "还不错"},
	}

	for _, str := range tests {
		testname := fmt.Sprintf("%s,%s", str.A, str.B)
		t.Run(testname, func(t *testing.T) {
			percent := float64(0)
			ret := SimilarText(str.A, str.B, &percent)
			if ret < 0 {
				t.Errorf("计算或例子错误 %s, %s", str.A, str.B)
			}
			fmt.Println(ret, fmt.Sprintf("%.2f", percent)+"%")
		})
	}
}
