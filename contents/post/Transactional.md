---
date: '2022-08-07'
title: '@Transactional 어노테이션 정리'
categories: ['Spring']
summary: '@Transactional 어노테이션 정리'
thumbnail: './test.png'
---


# Transactional
  - class, method 위에 `@Transactional` 을 추가하면 트랜잭션 기능이 적용 된 프록시 객체가 생성
  - 프록시 객체는 `PlatformTransactionManager` 를 사용하여 정상적인 종료에는 `commit`  비정상적인 종료에는 `rollback` 을 실행
   

## isolation - 격리수준

  | DEFAULT |  | - 기본 격리 수준(DB의 isolation level을 따름) |
  | --- | --- | --- |
  | READ_UNCOMMITTED | level 0 | - 커밋되지 않는(트랜잭션 처리중인) 데이터에 대한 읽기를 허용Dirty Read 발생 가능 |
  | READ_COMMITTED | level 1 | - 트랜잭션이 커밋 된 확정 데이터만 읽기 허용 <br/> - Dirty Read 발생 방지 |
  | REPEATABLE_READ | level 2 | - 트랜잭션이 완료될 때까지 SELECT 문장이 사용하는 모든 데이터에 shared lock이 걸리므로 다른 사용자는 그 영역에 해당되는 데이터에 대한 수정이 불가 <br/> - 선행 트랜잭션이 읽은 데이터는 트랜잭션이 종료될 때까지 후행 트랜잭션이 갱신하거나 삭제가 불가능 하기때문에 같은 데이터를 두 번 쿼리했을 때 일관성 있는 결과를 리턴 <br/> - Non-Repeatable Read 방지 |
  | SERIALIZABLE | level 3 | - 데이터의 일관성 및 동시성을 위해 MVCC(Multi Version Concurrency Control)을 사용하지 않음 <br/> - Phantom Read 방지 |
  

## propagation - 전파옵션 
        
  | REQUIRED | - 디폴트 속성 - 부모 트랜잭션 내에서 실행하며 부모 트랜잭션이 없을 경우 새로운 트랜잭션을 생성 |
  | --- | --- |
  | SUPPORTS | - 이미 시작된 트랜잭션이 있으면 참여, 그렇지 않으면 트랜잭션 없이 동작 |
  | REQUIRES_NEW | - 부모 트랜잭션을 무시, 무조건 새로운 트랜잭션을 생성 |
  | MANDATORY | - 이미 시작된 트랜잭션이 있으면 참여 <br/> - 이미 시작된 트랜잭션이 없음녀 예외를 발 <br/> - 독립적으로 트랜잭션을 진행하면 안 되는 경우 사용 |
  | REQUIRES_NEW | - 항상 새로운 트랜잭션을 생성 <br/> - 이미 시작된 트랜잭션이 있으면 잠시 보류 |
  | NOT_SUPPORTED | - 트랜잭션을 사용하지 않음 <br/> - 이미 시작된 트랜잭션이 있으면 보류 |
  | NEVER | - 트랜잭션을 사용하지 않도록 강제 <br/> - 이미 시작된 트랜잭션이 있으면 예외 발생  |
  | NESTED | - 이미 진행 중인 트랜잭션이 있으면 중첩 트랜잭션을 생성 <br/> - 중첩 트랜잭션이란 트랜잭션 안에 다시 트랜잭션을 만드는 것 <br/> - REQUIRES_NEW와는 차이가 있음 |
    

## readOnly - 읽기 전용 속성
  - 트랜잭션을 읽기 전용으로 설정
  - 일부 트랜잭션 매니저의 경우 읽기전용 속성을 무시하고 쓰기 작업을 허용할 수도 있기 때문에 주의 


## 트랜잭션 롤백 예외

  |  | Description |
  | --- | --- |
  | rollbackFor | - 특정 예외가 발생 시 강제로 Rollback <br/> - ex) @Transactional(rollbackFor=Exception.class) |
  | noRollbackFor | - 특정 예외의 발생 시 Rollback 처리되지 않음 <br/> - ex) @Transactional(noRollbackFor=Exception.class) | 


## timeout 
  - 지정한 시간 내에 처리가 완료되지 않은 경우 rollback
  - -1일 경우 no timeout
