/**
 * 
 * @param {*} sequelize: 우리의 설정 정보가 담긴 Sequelize 인스턴스입니다. 나중에 인자로 넣어줄거임
 * @param {*} Sequelize: Sequelize 기본 외부 모듈 클래스. 데이터 타입 정의 및 모델 상속
 * 
 */

module.exports = (sequelize, Sequelize) => {
    // comments 실제 데이터 베이스 테이블 이름에 자동 복수화로 s가 들어감.
    class Comment extends Sequelize.Model {
        static initialize() {
            return this.init(
                {
                    user_id: {
                        // VARCHAR(30) NOT NULL
                        type: Sequelize.STRING(30),
                        allowNull: false,
                    },
                    content: {
                        // TEXT NOT NULL
                        type: Sequelize.TEXT,
                        allowNull: false
                    }
                },
                {
                    // 현재 모델이 사용할 Sequelize 지정
                    // 데이터 베이스 연결 정보 포함
                    sequelize: sequelize,
                    // 자동 복수화 할거냐? => Comment => comments => 안한다.
                    freezeTableName: false
                }
            )
        }
    }

    return Comment.initialize()
}

/*
    Model 디렉토리

    현실 세계의 데이터를 추상적으로 표현한 것.
    
    모델(Model)은 데이터의 구조를 정의하는 설계도라고 함.
    => 어떤 특정 테이블에 대한 구조를 설명 및 정의

    repository => "SQL 쿼리 중심 접근 방식이다!를 설명"
    model => "SQL 쿼리가 아닌 ORM 중심 접근 방식이다!"를 설명
*/

/*
    module.exports = (sequelize, Sequelize) => {

        class Comment extends Sequelize.Model {
            static initialize() {
            // Sequelize.Model를 상속 받아서 Sequelize의 init메서드가 존재하는데,
            // 해당 메서드를 사용해 모델의 구조를 정의 및 설정 가능.
                return this.init(
                    // 테이블 컬럼 이름, 컬럼 데이터 타입, 옵션 등 설정
                    {},
                    // 테이블 이름, timestamp 사용 여부
                    {}
                )
            }
        }

        return Comment.initialize()
    }
*/

/*
    자동 복수화 사용 이유

    테이블의 형태에 맞춰서 여러 값을 넣을 수 있죠?

    comment => comments
    
    왜? 데이터 값이 하나 이상 들어갈거기 때문
*/