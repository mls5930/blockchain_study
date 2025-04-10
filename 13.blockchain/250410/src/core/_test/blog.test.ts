describe("블로그 작성용 테스트 파일", () => {

    it("1. 테스트", () => {

        const a = 10 + 10
        const b = a
        expect(b).toBe(20)
    })

    it("2. 배열테스트", () => {
        const Array = [1, 2, 3, 4, 5]
        expect(Array).toEqual([1, 2, 3, 4, 5])
        expect(Array.length).toBe(5)
    })

    it("3. 배열테스트 2", () => {
        const string = "나는 문자열"
        const Array = string.split("").map((word) => `${word}`)
        expect(Array).toEqual(['나', '는', ' ', '문', '자', '열'])
    })
}) 
