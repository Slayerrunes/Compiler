default rel
section .text
global main
main:
push qword 0
pop rax
cmp rax, 0
je lbl0
push qword 34
pop rax
ret
jmp lbl1
lbl0:
push qword 78
pop rax
ret
lbl1:
push qword 56
pop rax
ret
ret
section .data